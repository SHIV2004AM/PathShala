import {Router} from 'express'
import { addLecturesToCourseById, createCourse, getAllCourses, getLecturesByCourseId, removeCourse, updateCourse } from '../controllers/course.controller.js';
import { authorizedRoles, authorizeSubscriber, isLoggedIn } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';
const router = Router() ; 

router.get('/'  , getAllCourses) ; 

router.get('/:id' ,   isLoggedIn , authorizeSubscriber, getLecturesByCourseId) ;

router.post('/' ,isLoggedIn ,authorizedRoles('ADMIN') , upload.single('thumbnail') ,  createCourse)



router.put('/:id' , isLoggedIn ,authorizedRoles('ADMIN'), updateCourse)


router.delete('/:id' ,isLoggedIn  ,authorizedRoles('ADMIN'), removeCourse)

router.post('/:id' , isLoggedIn , authorizedRoles('ADMIN') , upload.single('lecture') , addLecturesToCourseById)

// delete lecture functionallity pending as an assignment 
export default router ; 