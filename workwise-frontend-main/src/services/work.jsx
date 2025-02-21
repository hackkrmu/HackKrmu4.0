

// Simulated API call
export const fetchWorks = async () => {
    console.log("calling fetchworks");
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            title: 'Frontend Development Project',
            startDate: '2024-03-15',
            endDate: '2024-04-15',
            skills: ['React', 'TypeScript', 'Tailwind CSS'],
            description: 'Develop a new user interface for the client dashboard',
            status: 'in-progress'
          },
          {
            id: '2',
            title: 'API Integration',
            startDate: '2024-04-20',
            endDate: '2024-05-10',
            skills: ['Node.js', 'REST API', 'GraphQL'],
            description: 'Integrate third-party payment gateway APIs',
            status: 'pending'
          }
        ]);
      }, 1000);
    });
  };