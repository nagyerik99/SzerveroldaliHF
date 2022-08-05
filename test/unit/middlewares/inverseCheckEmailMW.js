var expect = require("chai").expect;
var inverseCheckEmailMW = require("../../../middlewares/auth/inverseCheckEmailMW");

/**
 * ADDED NPM RUN SCRIPT:
 * NPM RUN COVERAGE RUNS ISTANBUL CODE COVERAGE OVER MOCHA
 * FOR MORE SCRIPTS PLEASE LOOK AT THE PACKAGE.JSON FILE
 */
describe("inverseCheckEmail middleware ", function () {
  it("should return without error because of error length", (done) => {
    const mw = inverseCheckEmailMW({
        userModel: {
            findOne: (param1,callback) =>{
                callback(null,"ugysehivodikmeg");
            }
        }
    });

    const res = {
        locals: {
            error: [
                "testError"
            ]
        }
    };
    mw({
        method: 'POST'
    },res,()=>{
        expect(res.locals.error).to.eql(["testError"]);
        done();
    });
  });

   it("should return without error because of request method", (done) => {
    const mw = inverseCheckEmailMW({
        userModel: {
            findOne: (param1,callback) =>{
                callback(null,"ugysehivodikmeg");
            }
        }
    });

    const res = {
        locals: {
            error: []
        }
    };
    const req = {
        method: "GET"
    }
    mw(req,res,()=>{
        expect(res.locals.error).to.be.eql([]);
        expect(res.locals.error.length).to.be.eql(0);
        expect(req.method).to.be.eql("GET");
        done();
    });
   });

   it("should return with error because of error because of user exists", (done) => {
    const mw = inverseCheckEmailMW({
        userModel: {
            findOne: (param1,callback) =>{
                expect(param1).to.be.eql({email: "useremail"});
                callback(null,"existingUser");
            }
        }
    });

    const res = {
        locals: {
            error: []
        }
    };
    const req = {
        body: {
            email: "useremail"
        },
        method: "POST"
    }
    mw(req,res,()=>{
        expect(res.locals.error).to.be.eql(["This email, has been already registered!"]);
        expect(res.locals.error.length).to.be.eql(1);
        expect(req.method).to.be.eql("POST");
        done();
    });
   });

   it("should return with error because of server error", (done) => {
    const mw = inverseCheckEmailMW({
        userModel: {
            findOne: (param1,callback) =>{
                expect(param1).to.be.eql({email: "useremail"});
                callback("serverError",undefined);
            }
        }
    });

    const res = {
        locals: {
            error: []
        }
    };
    const req = {
        body: {
            email: "useremail"
        },
        method: "POST"
    }
    mw(req,res,()=>{
        expect(res.locals.error).to.be.eql(["This email, has been already registered!"]);
        expect(res.locals.error.length).to.be.eql(1);
        expect(req.method).to.be.eql("POST");
        done();
    });
   });

   it("should return without error, no email found simple scenario", (done) => {
    const mw = inverseCheckEmailMW({
        userModel: {
            findOne: (param1,callback) =>{
                expect(param1).to.be.eql({email: "useremail"});
                callback(null,null);
            }
        }
    });

    const res = {
        locals: {
            error: []
        }
    };
    const req = {
        body: {
            email: "useremail"
        },
        method: "POST"
    }
    mw(req,res,()=>{
        expect(res.locals.error).to.be.eql([]);
        expect(res.locals.error.length).to.be.eql(0);
        expect(req.method).to.be.eql("POST");
        done();
    });
   });
});
