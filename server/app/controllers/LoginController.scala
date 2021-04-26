package controllers

import javax.inject._

import play.api.mvc._
import play.api.libs.json._
import models.InMemoryLoginModel

@Singleton
class LoginController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  import controllers.LoginController._

  implicit val userDataReads = Json.reads[UserData]

  def index = Action { implicit request =>
    //Shows the primary view
    Ok(views.html.index())
  }

  def validateUser = Action { implicit request =>
    //Checks if username and password is valid
    request.body.asJson.map { body =>
      Json.fromJson[UserData](body) match {
        case JsSuccess(input, path) =>
            val UserData(username, password) = input
            Ok(Json.toJson(InMemoryLoginModel.validateUser(username, password))
            ).withSession("username" -> username, "csrf-token" -> play.filters.csrf.CSRF.getToken.map(_.value).getOrElse(""))
        case _ =>
            println("Error in LoginController validateUser(): invalid JSON data")
            Ok(Json.toJson(false))
      }
    }.getOrElse {
      println("Error in LoginController validateUser(): cannot read JSON")
      Ok(Json.toJson(false))
    }
  }

  def createUser = Action { implicit request =>
    //Creates new username with password
    request.body.asJson.map { body =>
      Json.fromJson[UserData](body) match {
        case JsSuccess(input, path) =>
            val UserData(username, password) = input
            Ok(Json.toJson(InMemoryLoginModel.createUser(username, password))
            ).withSession("username" -> username, "csrf-token" -> play.filters.csrf.CSRF.getToken.map(_.value).getOrElse(""))
        case _ =>
            println("Error in LoginController createUser(): invalid JSON data")
            Ok(Json.toJson(false))
      }
    }.getOrElse {
      println("Error in LoginController createUser(): cannot read JSON")
      Ok(Json.toJson(false))
    }
  }
}


object LoginController {
  case class UserData(username: String, password: String)
}