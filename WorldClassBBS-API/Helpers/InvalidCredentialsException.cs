using System.Globalization;

namespace WorldClassBBS.Helpers
{
    public class InvalidCredentialsException : Exception
    {
        public InvalidCredentialsException() : base() {}
        public InvalidCredentialsException(string message) : base(message) {}
    }
}
