
<%if(rootViewName){ %>
  <%= rootViewName %>
  
  <div ui-view="<%= rootViewName %>"></div>
<%}%>



