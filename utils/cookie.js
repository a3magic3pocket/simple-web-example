// Reference by: https://mrcoles.com/blog/cookies-max-age-vs-expires/
export const getCookiExpires = (min) => {
  const date = new Date();
  date.setTime(date.getTime() + min * 60 * 1000); // in milliseconds

  return date;
}

export const getDomain = () => {
  if (location.hostname === 'localhost') {
    return location.hostname;
  }

  const splitted = location.hostname.split('.');
  if (splitted.length === 3) {
    return '.' + splitted[1] + '.' + splitted[2];
  }

  return '.' + location.hostname;
};

// Reference by: https://ko.javascript.info/cookie
export function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // 필요한 경우, 옵션 기본값을 설정할 수도 있습니다.
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

// 주어진 이름의 쿠키를 반환하는데,
// 조건에 맞는 쿠키가 없다면 undefined를 반환합니다.
export function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export  function deleteCookie(name, options = {}) {
  setCookie(name, "", {
    ...options,
    'max-age': -1
  })
}