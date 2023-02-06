export const GetDirectionByFirstLetter = (val: string | null | undefined) => {
  const persianUnicode = /^[\u0600-\u06FF\s]+$/;

  if (val && val.length) {
    return persianUnicode.test(val[0]) ? '' : '[direction:ltr]';
  }

  return '';
};