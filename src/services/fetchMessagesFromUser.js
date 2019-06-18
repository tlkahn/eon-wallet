//TODO: mock stub
export default function fetchMessagesFromUser(userId) {
    return [
          {
              id: 1,
              author: '1',
              recipient: 'apple',
              message: 'hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
              messageForm: 'text',
              timestamp: new Date().getTime()
          },
          {
              id: 2,
              author: '2',
              recipient: 'apple',
              message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
              messageForm: 'text',
              timestamp: new Date().getTime()
          },
          {
              id: 3,
              author: '2',
              recipient: 'apple',
              message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
              messageForm: 'text',
              timestamp: new Date().getTime()
          },
          {
              id: 4,
              author: 'apple',
              recipient: '1',
              message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
              messageForm: 'text',
              timestamp: new Date().getTime()
          },
          {
              id: 5,
              author: 'apple',
              recipient: '2',
              message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
              messageForm: 'text',
              timestamp: new Date().getTime()
          },
          {
              id: 6,
              author: 'apple',
              recipient: '3',
              message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
              messageForm: 'text',
              timestamp: new Date().getTime()
          },
          {
              id: 7,
              author: '2',
              recipient: 'apple',
              message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
              messageForm: 'text',
              timestamp: new Date().getTime()
          },
          {
              id: 8,
              author: '3',
              recipient: 'apple',
              message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
              messageForm: 'text',
              timestamp: new Date().getTime()
          },
          {
              id: 9,
              author: 'apple',
              recipient: '1',
              message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
              messageForm: 'text',
              timestamp: new Date().getTime()
          },
          {
              id: 10,
              author: '3',
              recipient: 'apple',
              messageForm: 'text',
              message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
              timestamp: new Date().getTime()
          },
      ];
}