export interface Deck {
  id: string;
  name: string;
  subredditIds: string[];
  subredditSettings: {
    [id: string]: {
      type: string;
    };
  };
}
