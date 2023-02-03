// Reference by: https://mrcoles.com/blog/cookies-max-age-vs-expires/
export const getCookiExpires = (min) => {
  const date = new Date();
  date.setTime(date.getTime() + min * 60 * 1000); // in milliseconds

  return date;
}

export const getCandidateDomains = () => {
  const firstPart = location.hostname.substring(0, 4);
  const isWwwContained = firstPart === "www";

  if (isWwwContained) {
    return [location.hostname, location.hostname.replace("www.", "")];
  }

  return [`www.${location.hostname}`, location.hostname];
};