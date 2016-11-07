/*
* A class for defining Document structure and properties.
*/

export class Schema {

  /*
  * Class constructor.
  */

  constructor ({fakes={}, fields={}, strict=true, validatorOptions={}, typeOptions={}}={}) {
    Object.defineProperty(this, 'fakes', { // document fields
      get: () => typeof fakes === 'function' ? fakes() : fakes,
    });

    Object.defineProperty(this, 'fields', { // document fields
      get: () => typeof fields === 'function' ? fields() : fields,
    });
    Object.defineProperty(this, 'strict', { // document schema mode
      value: strict
    });
    Object.defineProperty(this, 'validatorOptions', { // options for validatable.js
      value: validatorOptions
    });
    Object.defineProperty(this, 'typeOptions', { // options for typeable.js
      value: typeOptions
    });
  }

}
