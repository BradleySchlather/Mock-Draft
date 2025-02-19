using System;
using System.Security.Cryptography;
using System.Text;

namespace MockDraftApi.Services
{

    public class PasswordHasher
    {
        private const int SaltSize = 16; // 16-byte salt
        private const int KeySize = 32; // 32-byte hash (256 bits)
        private const int Iterations = 100000; // Number of iterations for PBKDF2

        public static string HashPassword(string password)
        {
            using var rng = new RNGCryptoServiceProvider();
            byte[] salt = new byte[SaltSize];
            rng.GetBytes(salt);

            using var pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithmName.SHA256);
            byte[] hash = pbkdf2.GetBytes(KeySize);

            return $"{Convert.ToBase64String(salt)}.{Convert.ToBase64String(hash)}";
        }

        public static bool VerifyPassword(string password, string storedHash)
        {
            var parts = storedHash.Split('.');
            if (parts.Length != 2) return false;

            byte[] salt = Convert.FromBase64String(parts[0]);
            byte[] storedHashBytes = Convert.FromBase64String(parts[1]);

            using var pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithmName.SHA256);
            byte[] computedHash = pbkdf2.GetBytes(KeySize);

            return CryptographicOperations.FixedTimeEquals(storedHashBytes, computedHash);
        }
    }
}
