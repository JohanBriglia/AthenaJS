export default class Modality {
    constructor({ modality, position } = {}) {
	this._modality = modality;
	this._position = position;
    }

    getLength() {
	return 1;
    }

    getMatricialLength() {
	return this._modality.length;
    }

    inject(probe) {
	return {
	    fluency: this._getMatricialInfimum(this._getSlice(probe), this._modality),
	    echo: [this._modality],
	};
    }

    asNumbers() {
	return this._modality.join(", ");
    }

    _getSlice(probe) {
	return probe[this._position];
    }

    _getMatricialInfimum(array1, array2) {
	return array1.map((x, i) => this._getInfimum({ x, y: array2[i] }));
    }

    _getInfimum({ x, y }) {
	return (Math.abs(x + y) / 2) - (Math.abs(x - y) / 2);
    }
}
