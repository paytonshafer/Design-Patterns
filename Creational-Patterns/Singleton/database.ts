// Our real world example of this is a database conncetion, we want each instance to connect to the same databse
class Database {
    private static instance: Database;
    private database: string[] = []

    private constructor() { }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }

    // Query from the database to get/add data
    // Query takes the form of cmd arg
    // Add Query: add num -> addes num to database
    // Get Query: get num -> returns number of times num is in the database
    public query(query: string) {
        const split = query.split(" ")

        switch(split[0]){
            case 'add':
                this.database.push(split[1])
                console.log(`ADD: Successfully added ${split[1]} to Database`)
                break
            case 'get':
                let count = 0
                this.database.forEach((x) => {x == split[1] ? count++ : null})
                console.log(`GET: '${split[1]}' Found ${count} Times`)
                break
            default:
                console.log('Invalid Command')
                break
        }

    }
}

function clientCode() {
    console.log("Connecting Client 1")
    const s1 = Database.getInstance();
    console.log("Connecting Client 2")
    const s2 = Database.getInstance();

    console.log("Adding to the database with Client 1")
    s1.query("add 4")
    s1.query("add 4")
    s1.query("add 4")
    s1.query("add 4")
    s1.query("add 4")
    s1.query("add 4")
    s1.query("add 2")
    s1.query("add 2")
    s2.query("add 2")
    console.log("Getting from database with Client 2")
    s2.query("get 4")
    s2.query("get 2")
    console.log("Adding to the database with Client 2")
    s2.query("add 6")
    console.log("Getting from database with Client 1")
    s2.query("get 6")
}

clientCode();

/* RESULT
Connecting Client 1
Connecting Client 2
Adding to the database with Client 1
ADD: Successfully added 4 to Database
ADD: Successfully added 4 to Database
ADD: Successfully added 4 to Database
ADD: Successfully added 4 to Database
ADD: Successfully added 4 to Database
ADD: Successfully added 4 to Database
ADD: Successfully added 2 to Database
ADD: Successfully added 2 to Database
ADD: Successfully added 2 to Database
Getting from database with Client 2
GET: '4' Found 6 Times
GET: '2' Found 3 Times
Adding to the database with Client 2
ADD: Successfully added 6 to Database
Getting from database with Client 1
GET: '6' Found 1 Times
*/