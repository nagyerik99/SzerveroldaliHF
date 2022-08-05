var expect = require("chai").expect;
var delRequestMW = require("../../../middlewares/request/delRequestMW");

describe("delRequest middleware ", function () {
  it("should return with no request object error", (done) => {
    const mw = delRequestMW({});

    const res = {
      locals: {},
    };

    mw({}, res, (err) => {
      expect(err).to.eql("No request object error");
      done();
    });
  });

  it("should return with serverSide error", (done) =>{
    const mw = delRequestMW({});

    const res = {
      locals: {
        request: {
          _id: "testRequestId",
          remove: (cb)=>{
            cb("serverSideError");
          }
        }
      },
    };

    mw({}, res, (err) => {
      expect(err).to.eql("serverSideError");
      done();
    });
  });
  
  it("should return without error on redirect", (done) =>{
    const mw = delRequestMW({});

    const res = {
      locals: {
        request: {
          _id: "testRequestId",
          remove: (cb)=>{
            res.locals.request = undefined;//törli magát :) 
            cb(undefined);
          }
        }
      },
      redirect: (url) =>{
        expect(url).to.be.eql('/request');
        expect(res.locals.request).to.be.eql(undefined);
        done();
      }
    };

    mw({}, res, () => {});
  });
});
