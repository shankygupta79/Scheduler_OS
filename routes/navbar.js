Vue.component('navbar-component', {
    props: [],
    created: function () {
        this.loadi();
    },
    methods: {
        loadi() {
            console.log(localStorage.getItem('panelTheme'))
            var val = (localStorage.getItem('panelTheme'));
            if (val == 'Theme 1') {
                //Orange
            } else if (val == "Theme 2") {
                //Black
                            $(':root').css('--navbar-color', '#000000');
                            $(':root').css('--text','#8CFF98')
                            $(':root').css('--body', '#8CFF98');
                            $(':root').css('--text-hover', '#483519');
            } else if (val == "Theme 3") {
                //Red
                            $(':root').css('--navbar-color', '#0F1108');
                            $(':root').css('--body', '#819595');
                            $(':root').css('--text','#F7F5FB')
                            $(':root').css('--text-hover', '#819595');
            } else if (val == "Theme 4") {
                //Green
                $(':root').css('--navbar-color', 'darkgreen');
                $(':root').css('--body', 'white');
                $(':root').css('--text-hover', 'rgb(91, 175, 91)');
            } else if (val == "Theme 5") {
                //Voilet
                $(':root').css('--navbar-color', 'purple');
                $(':root').css('--body', 'white');
                $(':root').css('--text-hover', 'rgb(175, 91, 171)');
            } else if (val == "Theme 6") {
                //Blue
                $(':root').css('--navbar-color', 'rgb(25, 51, 151)');
                $(':root').css('--body', 'white');
                $(':root').css('--text-hover', 'rgb(95, 118, 212)');

            } else if (val == "Theme 7") {
                //White
                $(':root').css('--navbar-color', 'rgb(165, 179, 182)');
                $(':root').css('--body', 'white');
                $(':root').css('--text-hover', 'rgb(206, 204, 200)');
            } else if (val == "Theme 8") {
                //Bluesky
                $(':root').css('--navbar-color', 'skyblue');
                $(':root').css('--body', 'white');
                $(':root').css('--text-hover', 'rgb(170, 250, 250)');
            }

            return 0
        }, changecolor: function () {
            console.log("Hi")
            if (localStorage.getItem('panelTheme') == 'Blue') {
                localStorage.setItem('panelTheme', 'Dark');
                window.location.reload();
            } else {
                localStorage.setItem('panelTheme', 'Blue');
                window.location.reload();
            }
        }


    },
    data:
        function () {
            return {
                error: "Err"
            };

        },

    template: `<nav id="sidebar">
    <div class="sidebar-header">
        <h3><img src="../Images/logo" class="logoi" ></h3>
    </div>
        <br>
    <ul class="list-unstyled components" style="padding:0">
        <p>Welcome</p>
        <li>
            <a href="https://scheduleros.herokuapp.com/dashboard"><i class="fa fa-tachometer" style="color:blue" aria-hidden="true"></i>&nbsp Dashboard</a>
        </li>
        <li >
            <a href="#employee" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
            <i class="fa fa-tasks" aria-hidden="true" style="color:green"></i>&nbsp Add Task</a>
            <ul class="collapse list-unstyled" id="employee" data-parent="#sidebar">
                <li>
                    <a href="https://scheduleros.herokuapp.com/tasks/add_single"><i class="fa fa-ellipsis-h" style="color:green"aria-hidden="true"></i>&nbsp Add Single Task</a>
                </li>
                <li>
                    <a href="https://scheduleros.herokuapp.com/tasks/add_multiple"><i class="fa fa-ellipsis-h" style="color:green"aria-hidden="true"></i>&nbsp Add Multiple Task</a>
                </li>
            </ul>
        </li>
        <li >
            <a href="#department" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
            <i class="fa fa-pencil-square-o" style="color:black" aria-hidden="true"></i>&nbsp Scheduler</a>
            
            <ul class="collapse list-unstyled" id="department" data-parent="#sidebar">
            <li>
                    <a href="https://scheduleros.herokuapp.com/tasks/manage_tasks"><i class="fa fa-ellipsis-h" style="color:black"aria-hidden="true"></i>&nbsp Manage Tasks</a>
            </li>    
            <li>
                    <a href="https://scheduleros.herokuapp.com/tasks/scheduler"><i class="fa fa-ellipsis-h" style="color:black"aria-hidden="true"></i>&nbsp Scheduler</a>
                </li>
            </ul>
        </li>
        <li >
            <a href="#concept" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
            <i class="fa fa-fort-awesome" style="color:purple" aria-hidden="true"></i>&nbsp Concept</a>
            <ul class="collapse list-unstyled" id="concept" data-parent="#sidebar">
                <li>
                    <a href="https://scheduleros.herokuapp.com/concept"><i class="fa fa-ellipsis-h" style="color:purple"aria-hidden="true"></i>&nbsp Project File</a>
                </li>
            </ul>
        </li>
        
        
        <li >
            <a href="#setting" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
            <i class="fa fa-cogs" aria-hidden="true" style="color:rgb(196, 5, 5)"></i>&nbsp Settings</a>
            <ul class="collapse list-unstyled" id="setting" data-parent="#sidebar">
                <li>
                    <a href="https://scheduleros.herokuapp.com/settings/change_password"><i class="fa fa-ellipsis-h" style="color:rgb(196, 5, 5)"aria-hidden="true"></i>&nbsp Change Password</a>
                </li>
                <li>
                    <a href="https://scheduleros.herokuapp.com/settings/configrations"><i class="fa fa-ellipsis-h" style="color:rgb(196, 5, 5)"aria-hidden="true"></i>&nbsp Configurations</a>
                </li>
            </ul>
        </li>
        
        
        
        
        <li>
            <a href="https://scheduleros.herokuapp.com/auth/logout"><i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp Logout</a>
        </li>
    </ul>

</nav>
`
    ,

});
Vue.component('navbar-top', {
    props: [],
    created: function () {

    },
    methods: {

    },
    data:
        function () {
            return {
                error: "Err",

            };

        },

    template: `<div class="navbarr">
                
    <button type="button" id="sidebarCollapse" >
        <i class="fa fa-bars"></i>
    </button>
    
    
    <div class="dropdown2" >
      <button class="dropbtn"><i class="fa fa-user-circle-o" aria-hidden="true" style="color:blue"></i>&nbsp 
      Administrator 
        <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown2-content">
            <a href="https://scheduleros.herokuapp.com/settings/profile" >Profile</a>
            <a href="https://scheduleros.herokuapp.com/settings/change_password" class="hov">Change Password</a>
            <a href="https://scheduleros.herokuapp.com/settings/configrations" class="hov">Configrations</a>
            <a href="https://scheduleros.herokuapp.com/auth/logout" class="hov">Logout &nbsp<i class="fa fa-sign-out" aria-hidden="true"></i> </a>
          </div>
    </div>
    </div>
    
  `
    ,
});
