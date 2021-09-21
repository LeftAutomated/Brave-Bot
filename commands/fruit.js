module.exports = {
    name: 'fruit',
    description: "Gives a random fruit",
    execute(message, args, client){
//        const fruits = ["apple", "strawberry", "pineapple", "watermelon"]; // WIP for fruit list
        const fruitsEmoji = ["<:apple:889677650342314035>", "<:strawberry:889677710023081985>", "<:pineapple:889677631912546355>", "<:watermelon:889674467159179324>"];
        
        const ranIndex = Math.trunc(Math.random() * fruitsEmoji.length);
//        var fruit = String(fruits[ranIndex]); // WIP for fruit list
        const fruitEmoji = String(fruitsEmoji[ranIndex]);
        message.channel.send(fruitEmoji);
    }
}