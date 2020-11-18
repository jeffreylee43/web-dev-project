# web-dev-project

Introduction:
Given the latest rise of retail investors, there have been a wide variety of options available for traders to add and view stocks. However, these options can sometimes be confusing and distracting for new and inexperienced traders. We hope to provide a solution to this issue by building a web application that allows users to select, add, and remove stocks to their dashboard.

Description:
This project features a stocks dashboard. Users can login to their account and then select, add, or view stocks that they want to keep track of. Each stock features a brief description of the company and showcases the average review based on users’ opinions. The dashboard uses an api that tracks stocks graph data live. Each individual stock page contains the stock’s overall description such as name, ticker, description, price of stock, market cap, industry, and number of employees. Users will have the ability to comment their opinions on these individual stock pages and provide their rating out of 5 stars for all other users to see. The database will store the company names, stock symbols, description, and users’ average ratings.


Core Features:

Landing Page:
-Explains that the website is a service for people to create and store their stocks dashboard.
-Leads to log-in page

Log-in Page:
-Login screen
-Users can register for an account using their email address

Dashboard:
-Displays list of stocks and their price
-Users can add or remove stocks from their list
-Each stock will display number of stars (out of 5) based on average users
-Users will be able to remove stock from the dashboard by clicking the remove button.
-Users will be able to sort their dashboard based on price, name, or review.

Stocks Listing Page:
-Users will be able to add stocks to their dashboard.
-Each company listing will have a brief description and overall buyer rating.
-Users will be able add stocks to their dashboard directly by clicking the add button next to a stock listing.
-Ability to sort by price, name, or average review.
-Ability to search for stocks not in the top 25. If there are none available, there will be a message prompted to the user “Not currently available.”

Individual Users History Feature:
-Contains a log of past activity of the User (additions/removals of different stocks and any reviews added)

Individual Stock Pages: 
-Provides an overview of the company profile (name, ticker, description, price of stock, market cap, industry, number of employees).
-Users will be able to submit reviews for all other users to see.
-Users will be able to add the stock to their dashboard
-Provides the average rating out of 5 stars among all reviewers.
