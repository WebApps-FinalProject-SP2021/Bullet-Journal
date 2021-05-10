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
  implicit val habitReads = Json.reads[Habit]
  implicit val taskWrites = Json.writes[Task]
  implicit val dayWrites = Json.writes[Day]
  implicit val habitWrites = Json.writes[Habit]
  
  //Loads Json of type A and calls function with that data
  def withJsonBody[A](f: A => Future[Result])(implicit request: Request[AnyContent], reads: Reads[A]): Future[Result] = {
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

  //Loads userid from session
  def withUserId(f: Int => Future[Result])(implicit request: Request[AnyContent]) = {
    request.session.get("userid").map { userid =>
      f(userid.toInt)
    }.getOrElse(Future.successful(Ok(Json.toJson(false))))
  }

  //Loads dayid from session
  def withDayId(f: Int => Future[Result])(implicit request: Request[AnyContent]) = {
    request.session.get("dayid").map { dayid =>
      f(dayid.toInt)
    }.getOrElse(Future.successful(Ok(Json.toJson(false))))
  }

  //Changes dayid of session, currently by receiving an id
  //Will not be necessary if dayid is part of task object
  def changeDay() = Action.async { implicit request =>
    val oldSession = request.session
    withJsonBody[Int]{ dayid =>
      val newSession = oldSession + ("dayid" -> dayid.toString())
      Future.successful(Ok(Json.toJson(true)).withSession(newSession))
    }
  }

  //Gets all tasks for a user from model
  def getAllTasks() = Action.async { implicit request =>
    withUserId { userid =>
      model.getAllTasks(userid).map(tasks => Ok(Json.toJson(tasks)))
    }
  }

  //Get tasks for current day and user from model
  def getTasksForDay() = Action.async { implicit request =>
    withUserId { userid =>
      withDayId { dayid =>
        model.getTasksForDay(userid, dayid).map(tasks => Ok(Json.toJson(tasks)))
      }
    }
  }

  //Add task to model
  def addTask() = Action.async { implicit request =>
    withUserId { userid =>
      withDayId { dayid =>
        withJsonBody[Task] { task =>
          model.addTask(task, userid, dayid).map(numAdded => Ok(Json.toJson(numAdded > 1)))
        }
      }
    }
  }

  //Delete task from model
  def deleteTask() = Action.async { implicit request =>
    withJsonBody[Int]{ taskid => 
      model.removeTask(taskid).map(deleted => Ok(Json.toJson(deleted)))
    }
  }
  
  //Get all days for a user from model
  def getAllDays() = Action.async { implicit request =>
    withUserId { userid =>
      model.getAllDays(userid).map(days => Ok(Json.toJson(days)))
    }
  }

  //Get habit from model
  def getHabits() = Action.async { implicit request =>
    withUserId { userid =>
      model.getHabits(userid).map(habits => Ok(Json.toJson(habits)))
    }
  }

  //Add habit to model
  def addHabit() = Action.async { implicit request =>
    withUserId { userid =>
      withJsonBody[Habit] { habit =>
        model.addHabit(habit, userid).map(numAdded => Ok(Json.toJson(numAdded > 1)))
      }
    }
  }

  //Remove habit from model
  def removeHabit() = Action.async { implicit request =>
    withJsonBody[Int] { habitid =>
      model.removeHabit(habitid).map(deleted => Ok(Json.toJson(deleted)))
    }
  }
}