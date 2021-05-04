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
  implicit val userDataReads = Json.reads[UserData]
  
  def withJsonBody[A](f: A => Future[Result])(implicit request: Request[AnyContent], reads: Reads[A]): Future[Result] = {
    //Loads Json of type A and calls function with that data
    request.body.asJson.map { body =>
      Json.fromJson[A](body) match {
        case JsSuccess(a, path) => f(a)
        case e @ JsError(_) => Future.successful(Redirect(routes.LoginController.index()))
      }
    }.getOrElse(Future.successful(Redirect(routes.LoginController.index())))
  }

  def userRequest(requestMethod: (String, String) => Future[Option[Int]])(implicit request: Request[AnyContent]) = {
    //Processess user validation and creation
    withJsonBody[UserData]{ userData =>
      val userIdFutureOption = requestMethod(userData.username, userData.password)
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

  def index = Action { implicit request =>
    //Shows the primary view
    Ok(views.html.index())
  }

  def validateUser = Action.async { implicit request =>
    //Checks if username and password is valid
    userRequest(model.validateUser)
  }

  def createUser = Action.async { implicit request =>
    //Creates new username with password
    userRequest(model.createUser)
  }
}


object LoginController {
  case class UserData(username: String, password: String)
}