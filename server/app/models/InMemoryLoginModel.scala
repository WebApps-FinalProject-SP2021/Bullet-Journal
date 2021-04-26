package models

object InMemoryLoginModel {
    //For testing purposes only. Validates and creates users within memory data.
    var users: List[(String, String)] = Nil

    def validateUser(username: String, password: String): Boolean = {
        users.contains(username -> password)
    }

    def createUser(username: String, password: String): Boolean = {
        if(users.forall(user => user._1 != username)) {
            users ::= username -> password
            true
        }
        else {
            false
        }
    }
}