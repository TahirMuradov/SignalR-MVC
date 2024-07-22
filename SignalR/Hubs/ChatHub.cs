using Microsoft.AspNetCore.SignalR;
using System.Data;

namespace SignalR.Hubs
{
    public class ChatHub:Hub
    {
        public async Task SendMessage(string FromToConnectionId, string message,string? SendToconnectionId=null)
        {
            if (string.IsNullOrEmpty(SendToconnectionId))
            {

            await Clients.All.SendAsync("receiveMessage", FromToConnectionId, message);
            }
            else
            {
                string logMessage = await Clients.Client(SendToconnectionId).InvokeAsync<string>("receiveMessage", FromToConnectionId, message, SendToconnectionId, new());

                Console.WriteLine(logMessage);

            }



        }
    }
}
