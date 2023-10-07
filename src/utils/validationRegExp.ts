export class ValidationDefinition {
  readonly regex: RegExp;
  readonly message: string;

  constructor(regex: RegExp, message: string) {
    this.regex = regex;
    this.message = message;
  }
}

export const notEmpty = new ValidationDefinition(
  new RegExp(/^\w+$/),
  "Das Feld darf nicht leer sein"
);
export const yearIn21thCentury = new ValidationDefinition(
  new RegExp(/^20\d{2}$/),
  "Das Jahr muss im 21. Jahrhundert liegen"
);
export const dateFormatRegex = new ValidationDefinition(
  new RegExp(
    /^(?:(?:1[6-9]|[2-9]\d)?\d{2})(?:(?:(\/|-)(?:0?[13578]|1[02])\1(?:31))|(?:(\/|-)(?:0?[13-9]|1[0-2])\2(?:29|30)))$|^(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(\/|-)0?2\3(?:29)$|^(?:(?:1[6-9]|[2-9]\d)?\d{2})(\/|-)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:0?[1-9]|1\d|2[0-8])$/
  ),
  "Das Datumsformat ist YYYY-MM-DD (2011-11-11)"
);
export const timeFormatRegex = new ValidationDefinition(
  new RegExp(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
  "Das Uhrzeitformat ist HH:mm (13:42)"
);
