export default class Modality {
    constructor({ modality, position } = {}) {
	this._modality = modality;
	this._position = position;
    }

    getLength() {
	return 1;
    }

    inject(probe) {
	return {
	    fluency: this._getInfimum({ x: this._getSlice(probe), y: this._modality }),
	    echo: [this._modality],
	};
    }

    asNumbers() {
	return this._modality;
    }

    _getSlice(probe) {
	return probe[this._position];
    }

    _getInfimum({ x, y }) {
	return (Math.abs(x + y) / 2) - (Math.abs(x - y) / 2);
    }
}
