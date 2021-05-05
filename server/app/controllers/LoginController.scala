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

  def index = Action { implicit request =>
    //Shows the primary view
    Ok(views.html.index())
  }

  def validateUser = Action.async { implicit request =>
    //Checks if username and password is valid
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

  def createUser = Action.async { implicit request =>
    //Creates new username with password
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
}

object LoginController {
  case class CreateUserData(username: String, password: String, fullname: String, email: String)
  case class LoginUserData(username: String, password: String)
}