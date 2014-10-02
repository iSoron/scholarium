/* Copyright (C) 2014 Alinson Xavier
 *
 * This file is part of Scholarium.
 *
 * Scholarium is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 * 
 * This software is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this software. If not, see <http://www.gnu.org/licenses/>.
 */

function GenericParser()
{
    this.scopus_parser = new ScopusParser();
    this.web_of_science_parser = new WebOfScienceParser();
}


GenericParser.prototype.parse = function(url, callback)
{
    if(url.indexOf("scopus.com") >= 0)
        this.scopus_parser.parse(url, callback);
        
    if(url.indexOf("webofknowledge.com") >= 0)
        this.web_of_science_parser.parse(url, callback);
}
