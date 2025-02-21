export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  reactions?: string[];
  bookmarked?: boolean;
  codeSnippet?: boolean;
  thread?: Message[];
}