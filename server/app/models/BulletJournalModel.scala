package models

import java.time.LocalDate
import java.time.ZoneId
import java.sql.Date
import slick.jdbc.PostgresProfile.api._
import scala.concurrent.ExecutionContext
import models.Tables._
import scala.concurrent.Future
import scala.concurrent.Await
import scala.concurrent.duration._
import org.mindrot.jbcrypt.BCrypt
import DataTypes._

class BulletJournalModel(db: Database)(implicit ec: ExecutionContext) {

    // Checks whether or not user has been created
    // Returns Some(userid) if true, None otherwise
    def validateUser(username: String, password: String): Future[Option[Int]] = {
        val matches = db.run(Users.filter(userRow => userRow.username === username).result)
        matches.map(userRows => userRows.headOption.flatMap { userRow => 
            if (BCrypt.checkpw(password, userRow.password)) Some(userRow.id) else None
        })
    }

    // Creates new user with supplied arguments
    // Returns Some(userid) if creation was successful, None otherwise
    def createUser(username: String, password: String, fullname: String, email: String): Future[Option[Int]] = {
        val matches = db.run(Users.filter(userRow => userRow.username === username).result)
        matches.flatMap { userRows =>
            if (userRows.isEmpty) {
                db.run(Users += UsersRow(-1, username, BCrypt.hashpw(password, BCrypt.gensalt()), fullname, email))
                .flatMap { addCount => 
                    if (addCount > 0) {
                        val user = db.run(Users.filter(userRow => userRow.username === username).result)
                        val numMonths = 6
                        user.foreach(rows => rows.map(row => createMonths(numMonths, row.id)))
                        user.map(_.headOption.map(_.id))
                    }
                    else Future.successful(None)
                }
            } else Future.successful(None)
        }
    }

    private def createMonths(months: Int, userid: Int): Unit = {
        val days = ((months * 30) + (months / 2)).toInt
        val today = LocalDate.now()
        for(day <- 0 until days) {
            val nextDay = today.plusDays(day)
            db.run(Days += DaysRow(-1, Date.valueOf(nextDay.toString()), None, userid))
        }
    }


    // Returns all tasks for the given user
    def getAllTasks(userid: Int): Future[Seq[Task]] = {
        db.run(
            (for {
                day <- Days
                task <- Tasks if task.userId === userid && task.dayId === day.id
            } yield {
                task
            }).result
        ).map(tasks => tasks.map(task => {
            Task(task.title, task.description, task.completed, getDate(task.dueDate), getDate(task.reminder))
        }))
    }

    // Returns all tasks for the given user and day
    def getTasksForDay(userid: Int, dayid: Int): Future[Seq[Task]] = {
        db.run(
            (for {
                task <- Tasks if task.userId === userid && task.dayId === dayid
            } yield {
                task
            }).result
        ).map(tasks => tasks.map(task => {
            Task(task.title, task.description, task.completed, getDate(task.dueDate), getDate(task.reminder))
        }))
    }

    private def getDate(odate: Option[java.sql.Date]): Option[LocalDate] = {
        odate match {
            case Some(date) => Some(date.toLocalDate)
            case None => None
        }
    }

    // Creates new task for given user and day with Task object supplied
    // Returns integer > 0 if successful, 0 otherwise
    def addTask(task: Task, userid: Int, dayid: Int): Future[Int] = {
        db.run(Tasks += TasksRow(-1, task.title, task.completed, task.description, null, null, userid, dayid))
    }

    // Deletes given task
    // Returns whether or not deletion was successful
    def deleteTask(taskid: Int): Future[Boolean] = {
        db.run(Tasks.filter(_.id === taskid).delete).map(count => count > 0)
    }

    // Returns all the Day objects for a given user
    // Supposed to be a kind of calendar
    // TODO: make sure days are sorted
    def getAllDays(userid: Int): Future[Seq[Day]] = {
        db.run(
            (for {
                day <- Days if day.userId === userid
            } yield {
                day
            }).result
        ).map(days => days.map(day => {
            Day(day.date.toLocalDate, day.mood)
        }))
    }

    // Returns all the Habit objects for a given user
    def getHabits(userid: Int): Future[Seq[Habit]] = {
        db.run(
            (for {
                habit <- Habits if habit.userId === userid
            } yield {
                habit
            }).result
        ).map(habits => habits.map(habit => {
            Habit(habit.title, habit.description)
        }))
    }

    // Creates new habit for given user with Habit object supplied
    // Returns integer > 0 if successful, 0 otherwise
    def addHabit(habit: Habit, userid: Int): Future[Int] = {
        db.run(Habits += HabitsRow(-1, habit.title, habit.description, userid))
    }

    // Deletes given habit
    // Returns whether or not deletion was successful
    def removeHabit(habitid: Int): Future[Boolean] = {
        db.run(Habits.filter(_.id === habitid).delete).map(count => count > 0)
    }

    // Gets all friends (accepted or pending) for given user
    // Returns FriendStatus objects specifying the relationship
    def getFriends(userid: Int): Future[Seq[FriendStatus]] = {
        db.run(
            (for {
                // Find user that sent request
                user <- Users if user.id === userid
                // Find friends of that user
                friend <- Friends if friend.userId === userid
                // Find friends of that user in the User table
                userFriend <- Users if userFriend.id === friend.friendId

                //friend <- Friends if friend.friendId === userid
            } yield {
                (user, userFriend, friend.pending)
            }).result
        ).map(statuses => statuses.map(status => {
            FriendStatus(status._1.username, status._2.username, status._3)
        }))
    }

    // Sends a request to user with friendid saying that user with userid would like to be friends
    // Returns integer > 0 if successful, 0 otherwise
    def requestFriend(senderid: Int, friendid: Int): Future[Int] = {
        db.run(Friends += FriendsRow(-1, false, senderid, friendid))
    }

    // Accepts friend request sent by sender
    // Returns integer > 0 if successful, 0 otherwise
    def acceptFriend(senderid: Int, friendid: Int): Future[Int] = {
        db.run(
            (for {
                friend <- Friends if friend.userId === senderid && friend.friendId === friendid
            } yield {
                friend
            }).update(FriendsRow(-1, true, senderid, friendid))
        )
    }

    // Deletes friends for both sender and friend regardless of pending status
    // Returns whether or not deletion was successful
    def removeFriend(senderid: Int, friendid: Int): Future[Boolean] = {
        db.run(Friends.filter(f => f.id === senderid || f.id === friendid).delete).map(count => count > 0)
    }

}