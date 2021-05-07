package controllers

import javax.inject._

import play.api.mvc._
import play.api.i18n._
import play.api.libs.json._
import models.BulletJournalModel
import models.DataTypes._

import scala.concurrent._
import play.api.db.slick._
import slick.jdbc._
import slick.jdbc.PostgresProfile.api._

@Singleton
class MainController @Inject()(protected val dbConfigProvider: DatabaseConfigProvider, cc: ControllerComponents)(implicit ec: ExecutionContext) 
  extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile] {

  private val model = new BulletJournalModel(db)
  implicit val taskReads = Json.reads[Task]
  implicit val dayReads = Json.reads[Day]
  implicit val taskWrites = Json.writes[Task]
  implicit val dayWrites = Json.writes[Day]
  
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

  def withUserId(f: Int => Future[Result])(implicit request: Request[AnyContent]) = {
    request.session.get("userid").map { userid =>
      f(userid.toInt)
    }.getOrElse(Future.successful(Ok(Json.toJson(false))))
  }
  def withDayId(f: Int => Future[Result])(implicit request: Request[AnyContent]) = {
    request.session.get("dayid").map { dayid =>
      f(dayid.toInt)
    }.getOrElse(Future.successful(Ok(Json.toJson(false))))
  }

  def changeDay() = Action.async { implicit request =>
    //Changes dayid of session, currently by receiving an id
    //Could potentially be changed to convert date to id
    val oldSession = request.session
    withJsonBody[Int]{ dayid =>
      val newSession = oldSession + ("dayid" -> dayid.toString())
      Future.successful(Ok(Json.toJson(true)).withSession(newSession))
    }
  }

  def getAllTasks() = Action.async { implicit request =>
    //Gets all tasks
    withUserId { userid =>
      model.getAllTasks(userid).map(tasks => Ok(Json.toJson(tasks)))
    }
  }

  def getAllDays() = Action.async { implicit request =>
    //Get all days
    withUserId { userid =>
      model.getAllDays(userid).map(days => Ok(Json.toJson(days)))
    }
  }

  def getTasksForDay() = Action.async { implicit request =>
    //Get tasks for current day
    withUserId { userid =>
      withDayId { dayid =>
        model.getTasksForDay(userid, dayid).map(tasks => Ok(Json.toJson(tasks)))
      }
    }
  }

  def addTask() = Action.async { implicit request =>
    withUserId { userid =>
      withDayId { dayid =>
        withJsonBody[Task] { task =>
          model.addTask(task, userid, dayid).map(numAdded => Ok(Json.toJson(numAdded)))
        }
      }
    }
  }
}