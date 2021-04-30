package models

import scala.concurrent._

object InMemoryLoginModel {
    //For testing purposes only. Validates and creates users within memory data.
    implicit val ec = ExecutionContext.global
    var users: List[(String, String)] = Nil
    def validateUser(username: String, password: String): Future[Boolean] = {
        Future {
            users.contains(username -> password)
        }
    }

    def createUser(username: String, password: String): Future[Boolean] = {
        Future {
            if(users.forall(user => user._1 != username)) {
                users ::= username -> password
                true
            }
            else {
                false
            }
        }
    }
}