﻿namespace mgrAPI.Models
{
    public class AuctionGetResponse
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public int Quantity { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string CategoryName { get; set; }
        public string Image { get; set; }
        public string SellerLogin { get; set; }
    }
}
