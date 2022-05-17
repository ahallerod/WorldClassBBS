using System.Globalization;

namespace WorldClassBBS.Helpers
{
    public class AppException : Exception
    {
        public AppException() : base() {}
        public AppException(string message) : base(message) {}
    }
}
