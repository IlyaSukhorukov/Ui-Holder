import {jsonProperty, Serializable} from "../../../core/decl";

export class Card extends Serializable {
  @jsonProperty(String, null)
  id: string | null = null;
  @jsonProperty(String, null)
  name: string | null = null;
  @jsonProperty(String, null)
  code: string | null = null;
  @jsonProperty(Number, null)
  stat_opened: number | null = null;
  @jsonProperty(Boolean, null)
  is_favorite: boolean | null = null;
}
