const TelegramBot = require('node-telegram-bot-api')

const token = '7240203550:AAGo8I_q-o-3dSruBJcYLTxSTlKxeQPauYY'

const bot = new TelegramBot(token, { polling: true })

const commands = [
  {
    command: 'get_first_number',
    description: 'Submit Your First Number'
  },
  {
    command: 'get_second_number',
    description: 'Submit Your Second Number'
  },
  {
    command: 'get_action_sign',
    description: 'Submit Your Action Sign'
  },
  {
    command: 'help',
    description: 'Description Of Bot'
  }
]

bot.setMyCommands(commands)

let inline_keyboard = [
  [
    { text: '+ (Plus)', callback_data: '+' },
    { text: '- (Minus)', callback_data: '-' }
  ],
  [
    { text: '* (Multiply)', callback_data: '*' },
    { text: '/ (Devide)', callback_data: '/' }
  ]
]
let numbers = []
bot.on('text', (msg) => {
  const chatId = msg.chat.id
  if (msg.text === '/get_first_number') {
    bot.sendMessage(chatId, 'Please Give Me First Number')
  } else if (msg.text === '/get_second_number') {
    bot.sendMessage(chatId, 'Please Give Me Second Number')
  } else if (msg.text === '/get_action_sign') {
    bot.sendMessage(chatId, 'Please Select Action Sign', {
      reply_markup: { inline_keyboard: inline_keyboard }
    })
  } else if (msg.text === '/help') {
    bot.sendMessage(chatId, 'Hello, this is <b>Calculator_Bot</b>.\n\n With This Bot, You Can Count <i>Different Expression Values</i>.\n The command <b><i>/get_first_number</i></b> wants your first number of expression to give that number to the bot.\n The command <b><i>/get_second_number</i></b> wants your second number of expression to give that number the bot.\n The command <b><i>/get_action_sign</i></b> wants to know what action sign you want to submit.\n Then the bot will give you the <b>value</b> of your expression.',
    {
      parse_mode: "HTML"
    })
  }
  if (!isNaN(+msg.text)) {
    numbers.push(+msg.text)
  }

})

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id
  if (query.data === '+'){
    bot.sendMessage(chatId, `value: ${numbers[0] + numbers[1]}`) 
    numbers = []
  } else if(query.data === '-'){
    bot.sendMessage(chatId, `value: ${numbers[0] - numbers[1]}`)
    numbers = []
  } else if(query.data === '*'){
    bot.sendMessage(chatId, `value: ${numbers[0] * numbers[1]}`)
    numbers = []
  } else if(query.data == '/'){
    bot.sendMessage(chatId, `value: ${numbers[0] / numbers[1]}`)
    numbers = []
  }


    bot.answerCallbackQuery(query.id)
})
