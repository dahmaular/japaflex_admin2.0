/* eslint-disable @typescript-eslint/no-explicit-any */

export const parseQueryParams = (queryParams: any) => {
  const params = new URLSearchParams();
  Object.keys(queryParams).forEach((key) => {
    if (queryParams[key] instanceof Array) {
      queryParams[key].forEach((item: any) => {
        if (item.length) {
          params.append(`${key}`, item);
        } else {
          return;
        }
      });
    } else {
      params.append(key, queryParams[key]);
    }
  });

  return params;
};
