import querystring from 'querystring';
import cn from 'classnames';

export function classNames(props, type, ...params) {
    const { name, validate, className } = props;
    const validationError = !!validate && !validate();
    return cn.apply(null, [...params, className, {
        [`rm-${name}`]: !!name,
        [`rm-${type}`]: !!type,
        'rm-validation-error': validationError,
    }]);
}

export class Base64 {

    static keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    static encode(input) {
        let output = '';
        let chr1;
        let chr2;
        let chr3;
        let enc1;
        let enc2;
        let enc3;
        let enc4;
        let i = 0;

        input = Base64.utf8Encode(input); // eslint-disable-line
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + this.keyStr.charAt(enc1) + this.keyStr.charAt(enc2) +
                this.keyStr.charAt(enc3) + this.keyStr.charAt(enc4);
        }
        return output;
    }

    static decode(input) {
        let output = '';
        let chr1;
        let chr2;
        let chr3;
        let enc1;
        let enc2;
        let enc3;
        let enc4;
        let i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, ""); // eslint-disable-line

        while (i < input.length) {
            enc1 = this.keyStr.indexOf(input.charAt(i++));
            enc2 = this.keyStr.indexOf(input.charAt(i++));
            enc3 = this.keyStr.indexOf(input.charAt(i++));
            enc4 = this.keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 !== 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = Base64.utf8Decode(output);
        return output;
    }

    static utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n"); // eslint-disable-line
        let utftext = '';

        for (let n = 0; n < string.length; n++) {
            const c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }

    static utf8Decode(utftext) {
        let string = '';
        let i = 0;
        let c2 = 0;
        const c1 = 0;
        let c = c1;

        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                const c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }

}


export function camelize(str) {
    return `${str}`.replace(/-(.)/g, (s, l) => l.toUpperCase());
}


export function toVarName(str) {
    return camelize(str).replace(/^(.)/, (s, c) => c.toLowerCase());
}


export function resolveModule(mod) {
    return mod.__esModule ? mod.default : mod; // eslint-disable-line no-underscore-dangle
}


export function floatCompare(a, b) {
    const fa = parseFloat(a);
    const fb = parseFloat(b);
    return fa > fb ? 1 : (fb > fa ? -1 : 0); // eslint-disable-line no-nested-ternary
}


export function encodeParams(params) {
    return encodeURIComponent(Base64.encode(JSON.stringify(params)));
}


export function decodeParams(params) {
    return JSON.parse(Base64.decode(decodeURIComponent(params)));
}


export function comm(config) {
    let url = config.url;
    const options = {
        credentials: 'include',
        method: (config.method || 'GET').toUpperCase(),
        headers: new Headers(),
    };
    options.headers.append('Accept', options.accept || 'application/json');
    // TODO: we souldn't sent content type for GET requests, remove it when the back-end is fixed
    options.headers.append('Content-Type', options.contentType || 'application/json');
    if (config.data) {
        if (options.method === 'POST' || options.method === 'PUT') {
            options.body = JSON.stringify(config.data);
        } else { // post, put or delete
            url += `?${querystring.stringify(config.data)}`;
        }
    }
    return new Promise((resolve, reject) => {
        fetch(url, options).then((response) => {
            const handle = (json) => {
                if (response.status === 401) {
                    location.href = response.headers.get('Location');
                }
                if (response.status >= 200 && response.status < 300) {
                    resolve(json);
                } else {
                    const err = new Error(response.statusText);
                    err.json = json;
                    err.response = response;
                    reject(err);
                }
            };
            response.json().then(handle).catch(() => handle({}));
        });
    });
}


/**
 *  insertTreeElement(tree, path, [name], value);
 *
 *  returns true if any internal node was inserted false otherwise
 */
export function insertTreeElement(tree, path, name, value) {
    let node = tree;
    let max = path.length;
    let v = value;
    let n = name;
    let update = false;
    if (value === undefined) {
        v = name;
        max--;
        n = path[max];
    }
    for (let i = 0; i < max; i++) {
        const key = path[i];
        update = !node[key];
        node = node[key] = node[key] || {};
    }
    node[n] = v;
    return update;
}


export function getCookie(cname) {
    const name = `${cname}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}