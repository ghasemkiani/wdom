//	@ghasemkiani/wdom/js/thread

const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {Base} = require("@ghasemkiani/commonbase/base");
const {Script} = require("@ghasemkiani/wdom/js/script");

class Thread extends Base {
	get worker() {
		if(!this._worker) {
			this._worker = this.createWorker(new Script().add(arg => {
				let call = (method, ...rest) => {
					postMessage(JSON.stringify([method, ...rest]));
				};
				onmessage = ({data}) => {
					[f, ...rest] = JSON.parse(data);
					f = eval(f);
					f(call, ...rest);
				};
			}, {}).dataUri);
			this._worker.onmessage = ({data}) => {
				let [method, ...rest] = JSON.parse(data);
				this[method](...rest);
			};
		}
		return this._worker;
	}
	set worker(worker) {
		this._worker = worker;
	}
	createWorker(dataUri) {
		return new Worker(dataUri);
	}
	work(f, ...rest) {
		this.worker.postMessage(JSON.stringify([`(${f.toString()})`, ...rest]));
	}
	terminate() {
		this.worker.terminate();
	}
}
cutil.extend(Thread.prototype, {
	_worker: null,
});

module.exports = {Thread};
