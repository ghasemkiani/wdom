//	@ghasemkiani/wdom/js/thread

const {cutil} = require("@ghasemkiani/base/cutil");
const {Obj: Base} = require("@ghasemkiani/base/obj");
const {Script} = require("@ghasemkiani/wdom/js/script");

class Thread extends Base {
	get promises() {
		if(!this._promises) {
			this._promises = {};
		}
		return this._promises;
	}
	set promises(promises) {
		this._promises = promises;
	}
	get worker() {
		if(!this._worker) {
			this._worker = this.createWorker(new Script().add(arg => {
				let call = (method, ...rest) => {
					postMessage(JSON.stringify([method, ...rest]));
				};
				onmessage = async ({data}) => {
					let [key, f, ...rest] = JSON.parse(data);
					f = eval(f);
					try {
						let result = await f(call, ...rest);
						call("resolve", key, result);
					} catch(e) {
						call("reject", key, e.message);
					}
				};
			}, {}).dataUri);
			let promises = this.promises;
			this._worker.onmessage = ({data}) => {
				let [method, ...rest] = JSON.parse(data);
				if(method === "resolve") {
					let [key, result] = rest;
					let promise = promises[key];
					if(promise) {
						promise.resolve(result);
						delete promises[key];
					}
				} else if(method === "reject") {
					let [key, message] = rest;
					let promise = promises[key];
					if(promise) {
						promise.reject(message);
						delete promises[key];
					}
				} else {
					this[method](...rest);
				}
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
		f = f || (() => {});
		let key = cutil.srand(16);
		return new Promise((resolve, reject) => {
			this.promises[key] = {resolve, reject};
			this.worker.postMessage(JSON.stringify([key, `(${f.toString()})`, ...rest]));
		});
	}
	terminate() {
		this.worker.terminate();
	}
}
cutil.extend(Thread.prototype, {
	_worker: null,
	_promises: null,
});

module.exports = {Thread};
