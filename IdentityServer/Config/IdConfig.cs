using IdentityModel;
using IdentityServer4.Models;
using IdentityServer4.Test;
using System.Security.Claims;

namespace IdentityServer.Config
{
    public class IdConfig
    {

        public static List<TestUser> TestUsers =>

                new List<TestUser>
                {
                    new TestUser
                    {
                        Username = "Erika33",
                        Password =  "1234",
                        SubjectId = "11",
                        Claims =
                        {

                            new Claim(JwtClaimTypes.Name," Erika")

                        }

                    }
                };


        public static IEnumerable<IdentityResource> IdentityResources =>
            new IdentityResource[] {

                new IdentityResources.OpenId(),
                new IdentityResources.Profile()

            };



        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[] {

                new ApiScope("WorldClassBBS.write"),
                new ApiScope("WorldClassBBS.read")

            };


        public static IEnumerable<ApiResource> ApiResources =>
         new ApiResource[] {

                new ApiResource("WorldClassBBS")
                {

                    Scopes = new List<string>{ "WorldClassBBS.write", "WorldClassBBS.read" },
                    ApiSecrets = new List<Secret> { new Secret("f4J3sf3fg2f88fwsskHwrwf3fOhzzgdg2f922".Sha256())}
                    
                    // Scopes
                    // App Secret
                }


         };



        public static IEnumerable<Client> Clients =>
            new Client[] {

                new Client{

                ClientName = "WCBBS-API",
                ClientId   = "774",
                AllowedGrantTypes = GrantTypes.ClientCredentials,
                ClientSecrets = new List<Secret> { new Secret("fdsgj38gf1jklfJKK3Hf02sdkl292k34".Sha256())},
                AllowedScopes = new List<String> { "WorldClassBBS.write", "WorldClassBBS.read" }

                }

                 };

    }
}
