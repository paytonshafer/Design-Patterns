// Our real world example of this is a database conncetion, we want each instance to connect to the same databse
var Database = /** @class */ (function () {
    function Database() {
        this.database = [];
    }
    Database.getInstance = function () {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    };
    // Query from the database to get/add data
    // Query takes the form of cmd arg
    // Add Query: add num -> addes num to database
    // Get Query: get num -> returns number of times num is in the database
    Database.prototype.query = function (query) {
        var split = query.split(" ");
        switch (split[0]) {
            case 'add':
                this.database.push(split[1]);
                console.log("ADD: Successfully added ".concat(split[1], " to Database"));
                break;
            case 'get':
                var count_1 = 0;
                this.database.forEach(function (x) { x == split[1] ? count_1++ : null; });
                console.log("GET: '".concat(split[1], "' Found ").concat(count_1, " Times"));
                break;
            default:
                console.log('Invalid Command');
                break;
        }
    };
    return Database;
}());
function clientCode() {
    console.log("Connecting Client 1");
    var s1 = Database.getInstance();
    console.log("Connecting Client 2");
    var s2 = Database.getInstance();
    console.log("Adding to the database with Client 1");
    s1.query("add 4");
    s1.query("add 4");
    s1.query("add 4");
    s1.query("add 4");
    s1.query("add 4");
    s1.query("add 4");
    s1.query("add 2");
    s1.query("add 2");
    s2.query("add 2");
    console.log("Getting from database with Client 2");
    s2.query("get 4");
    s2.query("get 2");
    console.log("Adding to the database with Client 2");
    s2.query("add 6");
    console.log("Getting from database with Client 1");
    s2.query("get 6");
}
clientCode();
