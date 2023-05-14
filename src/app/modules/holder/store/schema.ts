export class Card {
  id: string = '';
  name: string = '';
  code: string = '';
  stat_opened: number = 0;
  is_favorite: boolean = false;
  type: string = '';
  access: string = '';
  description: string = '';
}

export class User {
  public_id: string = '';
  public_name: string = '';
}

export class FriendRequest {
  uuid: string | null = '';
  from: string = '';
  to: string = '';
  status: 'request' | 'family' | 'subscriber' = 'request';
}
