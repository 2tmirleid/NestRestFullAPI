export class DateNow {
  public static dateNow = new Date().toISOString().
  replace(/T/, ' ').
  replace(/\..+/, '');
}