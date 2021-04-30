package controllers

import javax.inject._

import play.api.mvc._
import play.api.libs.json._
import models.InMemoryLoginModel
import scala.concurrent._

@Singleton
class LoginController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  import controllers.LoginController._

  implicit val userDataReads = Json.reads[UserData]
  implicit val ec = ExecutionContext.global

  def index = Action { implicit request =>
    //Shows the primary view
    Ok(views.html.index())
  }

  def validateUser = Action.async { implicit request =>
    //Checks if username and password is valid
    request.body.asJson.map { body =>
      Json.fromJson[UserData](body) match {
        case JsSuccess(input, path) =>
            val UserData(username, password) = input
            InMemoryLoginModel.validateUser(username, password).map { validated =>
              Ok(Json.toJson(validated))
            }
        case _ =>
            println("Error in LoginController validateUser(): invalid JSON data")
            Future.successful(Ok(Json.toJson(false)))
      }
    }.getOrElse {
      println("Error in LoginController validateUser(): cannot read JSON")
      Future.successful(Ok(Json.toJson(false)))
    }
  }

  def createUser = Action.async { implicit request =>
    //Creates new username with password
    request.body.asJson.map { body =>
      Json.fromJson[UserData](body) match {
        case JsSuccess(input, path) =>
            val UserData(username, password) = input
            InMemoryLoginModel.createUser(username, password).map{ created =>
              Ok(Json.toJson(created))
            }
        case _ =>
            println("Error in LoginController createUser(): invalid JSON data")
            Future.successful(Ok(Json.toJson(false)))
      }
    }.getOrElse {
      println("Error in LoginController createUser(): cannot read JSON")
      Future.successful(Ok(Json.toJson(false)))
    }
  }
}


object LoginController {
  case class UserData(username: String, password: String)
}