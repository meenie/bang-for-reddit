export interface Deck {
  id: string;
  name: string;
  subredditIds: string[];
  subredditSettings: {
    [subredditId: string]: {
      type: string;
    };
  };
}
