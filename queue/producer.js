const amqplib = require('amqplib');
const amqp_url_cloud = 'amqps://wpobzdct:BT......'
const amqp_url_docker = ''

const sendQueue = async ({ msg }) => {
    try {
        // 1. create a connection 
        const conn = await amqplib.connect(amqp_url_cloud)

        // 2. create a new channel
        const channel = await conn.createChannel()

        // 3. create a queue name
        const newQueue = 'q1'
  
        // 4. 
        await channel.assertQueue(newQueue, {
            durable: true // khi server bi down thi tin nhan trong hang doi se mat het
        })

        // 5. Send to a queue
        await channel.sendToQueue(newQueue, Buffer.from(msg), {
            //expiration: '20000' // TTL: time to live, milliseconds ~ 20s
            persistent: true
        })
        
    } catch (error) {
        console.error(`Error:: `, error.message)
    }
}


sendQueue({msg: 'testing send queue'})