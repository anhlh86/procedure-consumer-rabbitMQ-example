const amqplib = require('amqplib');
const amqp_url_cloud = 'amqps://wpobzdct:BT......'
const amqp_url_docker = ''

const receiveQueue = async () => {
    try {
        // 1. create a connection 
        const conn = await amqplib.connect(amqp_url_cloud)

        // 2. create a new channel
        const channel = await conn.createChannel()

        // 3. create a queue name
        const newQueue = 'q1'
  
        // 4. 
        await channel.assertQueue(newQueue, {
            durable: false // khi server bi down thi tin nhan trong hang doi se mat het
        })

        //
        await channel.consume(newQueue, msg => {
            console.log(`Msg: `, msg.content.toString())
        }, {
            noAck: true
        })
        
    } catch (error) {
        console.error(`Error: `, error.message)
    }
}


receiveQueue()