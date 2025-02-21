export interface Feedback {
  id: string;
  date: string;
  author: string;
  content: string;
  rating: number;
}

export const fetchFeedback = async (): Promise<Feedback[]> => {
  // Simulated API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          date: '2024-03-10',
          author: 'John Smith',
          content: 'Excellent team player with strong problem-solving skills.',
          rating: 5
        },
        {
          id: '2',
          date: '2024-03-05',
          author: 'Sarah Johnson',
          content: 'Great communication and technical expertise.',
          rating: 4
        }
      ]);
    }, 1000);
  });
};