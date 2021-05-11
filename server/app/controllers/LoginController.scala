package controllers

import javax.inject._

import play.api.mvc._
import play.api.i18n._
import play.api.libs.json._
import models.BulletJournalModel

import scala.concurrent._
import play.api.db.slick._
import slick.jdbc._
import slick.jdbc.PostgresProfile.api._

@Singleton
class LoginController @Inject()(protected val dbConfigProvider: DatabaseConfigProvider, cc: ControllerComponents)(implicit ec: ExecutionContext) 
  extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile] {

  import LoginController._
  private val model = new BulletJournalModel(db)
  implicit val loginDataReads = Json.reads[LoginUserData]
  implicit val createDataReads = Json.reads[CreateUserData]
  
  def withJsonBody[A](f: A => Future[Result])(implicit request: Request[AnyContent], reads: Reads[A]): Future[Result] = {
    //Loads Json of type A and calls function with that data
    request.body.asJson.map { body =>
      Json.fromJson[A](body) match {
        case JsSuccess(a, path) => f(a)
        case e @ JsError(_) =>
          println("Error in LoginController: " + e)
          Future.successful(Ok(Json.toJson(false)))
      }
    }.getOrElse {
      println("Error in LoginController: cannot read JSON body")
      Future.successful(Ok(Json.toJson(false)))
    }
  }

  // Loads user id from session
  def withUserId(f: Int => Future[Result])(implicit request: Request[AnyContent]) = {
    request.session.get("userid").map { userid =>
      f(userid.toInt)
    }.getOrElse(Future.successful(Ok(Json.toJson(false))))
  }

  // Shows the primary view
  def index = Action { implicit request =>
    Ok(views.html.index())
  }

  // Checks if username and password is valid
  def validateUser = Action.async { implicit request =>
    withJsonBody[LoginUserData]{ userData =>
      val userIdFutureOption = model.validateUser(userData.username, userData.password)
      userIdFutureOption.map { userIdOption =>
        userIdOption.map { userId =>
          Ok(Json.toJson(true))
            .withSession("username" -> userData.username, "userid" -> userId.toString, "csrfToken" -> play.filters.csrf.CSRF.getToken.map(_.value).getOrElse(""))
        }.getOrElse {
          Ok(Json.toJson(false))
        }
      }
    }
  }

  // Creates new username with password
  def createUser = Action.async { implicit request =>
    withJsonBody[CreateUserData]{ userData =>
      val userIdFutureOption = model.createUser(userData.username, userData.password, userData.fullname, userData.email)
      userIdFutureOption.map { userIdOption =>
        userIdOption.map { userId =>
          Ok(Json.toJson(true))
            .withSession("username" -> userData.username, "userid" -> userId.toString, "csrfToken" -> play.filters.csrf.CSRF.getToken.map(_.value).getOrElse(""))
        }.getOrElse {
          Ok(Json.toJson(false))
        }
      }
    }
  }

  // Takes a full name and updates current user to that name
  def editUserFullname = Action.async { implicit request =>
    withUserId { userid => 
      withJsonBody[String] { fullname =>
        model.editUserFullname(userid, fullname).map(numEdited => Ok(Json.toJson(numEdited > 0)))
      }
    }
  }

  // Takes an email and updates current user to that email
  def editUserEmail = Action.async { implicit request =>
    withUserId { userid => 
      withJsonBody[String] { email =>
        model.editUserFullname(userid, email).map(numEdited => Ok(Json.toJson(numEdited > 0)))
      }
    }
  }
}

object LoginController {
  case class CreateUserData(username: String, password: String, fullname: String, email: String)
  case class LoginUserData(username: String, password: String)
}