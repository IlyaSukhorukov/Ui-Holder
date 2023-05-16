export class Card {
  id: string = '';
  id_user: string = '';
  name: string = '';
  code: string = '';
  stat_opened: number = 0;
  is_favorite: boolean = false;
  type: string = '';
  access: 'public' | 'family' | 'private' = 'private';
  description: string = '';
}

export class User {
  public_id: string = '';
  public_name: string = '';
}

export class Relations {
  uuid: string | null = '';
  from: string = '';
  to: string = '';
  status: 'request' | 'family' | 'subscriber' = 'request';
  timestamp: string | null = null;
}
