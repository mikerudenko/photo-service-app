/* eslint-disable @typescript-eslint/no-var-requires */
const request = require('request');

/**
 * Constructor.
 *
 * @param string $public_key
 * @param string $private_key
 *
 * @throws InvalidArgumentException
 */
module.exports = function (public_key, private_key) {
  // API host
  this.host = 'https://www.liqpay.ua/api/';

  /**
   * Call API
   *
   * @param string $path
   * @param Object $params
   * @param function $callback
   *
   * @return Object
   */
  this.api = function (path, params, callback, callbackerr) {
    if (!params.version) throw new Error('version is null');

    params.public_key = public_key;
    const data = new Buffer(JSON.stringify(params)).toString('base64');
    const signature = this.str_to_sign(private_key + data + private_key);

    request.post(
      this.host + path,
      { form: { data: data, signature: signature } },
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          callback(JSON.parse(body));
        } else {
          callbackerr(error, response);
        }
      },
    );
  };

  /**
   * cnb_form
   *
   * @param Object $params
   *
   * @return string
   *
   * @throws InvalidArgumentException
   */
  this.cnb_form = function (params) {
    let language = 'ru';
    if (params.language) language = params.language;

    params = this.cnb_params(params);
    const data = new Buffer(JSON.stringify(params)).toString('base64');
    const signature = this.str_to_sign(private_key + data + private_key);

    return (
      '<form method="POST" action="https://www.liqpay.ua/api/3/checkout" accept-charset="utf-8">' +
      '<input type="hidden" name="data" value="' +
      data +
      '" />' +
      '<input type="hidden" name="signature" value="' +
      signature +
      '" />' +
      '<input type="image" src="//static.liqpay.ua/buttons/p1' +
      language +
      '.radius.png" name="btn_text" />' +
      '</form>'
    );
  };

  /**
   * cnb_signature
   *
   * @param Object $params
   *
   * @return string
   *
   * @throws InvalidArgumentException
   */
  this.cnb_signature = function (params) {
    params = this.cnb_params(params);
    const data = new Buffer(JSON.stringify(params)).toString('base64');
    return this.str_to_sign(private_key + data + private_key);
  };

  /**
   * cnb_params
   *
   * @param Object $params
   *
   * @return Object $params
   *
   * @throws InvalidArgumentException
   */
  this.cnb_params = function (params) {
    params.public_key = public_key;

    if (!params.version) throw new Error('version is null');
    if (!params.amount) throw new Error('amount is null');
    if (!params.currency) throw new Error('currency is null');
    if (!params.description) throw new Error('description is null');

    return params;
  };

  /**
   * str_to_sign
   *
   * @param string $str
   *
   * @return string
   */
  this.str_to_sign = function (str) {
    const crypto = require('crypto');
    const sha1 = crypto.createHash('sha1');
    sha1.update(str);
    return sha1.digest('base64');
  };

  /**
   * Return Form Object
   */
  this.cnb_object = function (params) {
    let language = 'ru';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if (params.language) language = params.language;

    params = this.cnb_params(params);
    const data = new Buffer(JSON.stringify(params)).toString('base64');
    const signature = this.str_to_sign(private_key + data + private_key);

    return { data: data, signature: signature };
  };

  return this;
};
