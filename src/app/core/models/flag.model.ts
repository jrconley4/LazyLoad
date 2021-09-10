
import { List, Record } from 'immutable';

const FlagRecord = Record({
  flagId: 0,
  name: "",
  bitValue: false
});

export class Flag extends FlagRecord {

  flagId!: number;
  name!: string;
  bitValue!: boolean;

  constructor(props: Iterable<[string, unknown]> | Partial<{ flagId: number; name: string; bitValue: boolean; }> | undefined) {
    super(props);
  }
}
