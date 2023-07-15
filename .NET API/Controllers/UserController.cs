using mgrAPI.Data_Access_Layer;
using mgrAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace mgrAPI.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserContext context;

        public UserController(UserContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsersList()
        {
            return await context.User.ToListAsync();
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> TryLogin([FromBody] UserLoginRequest data)
        {
            try
            {
                List<User> userList = await context.User.ToListAsync();
                User user = userList.Find(x => x.Login == data.Login);
                if (user == null)
                {
                    return NotFound();
                }
                else
                {
                    if (data.Password == user.Password)
                        return Ok(user);
                    else
                        return Unauthorized();
                }
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<ActionResult> RegisterAccount([FromBody] User userToRegister)
        {
            try
            {
                List<User> userList = await context.User.ToListAsync();
                User user = userList.Find(x => x.Login == userToRegister.Login);
                if (user == null)
                {
                    int idToAdd = (int)(from n in context.User orderby n.ID descending select n.ID).FirstOrDefault();
                    userToRegister.ID = idToAdd + 1;
                    context.User.Add(userToRegister);
                    context.SaveChanges();
                    return Ok();
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
