var expect = require("chai").expect;
var getInventoriesMW = require("../../../middlewares/inventory/getInventoriesMW");

describe("getInventories middleware ", function () {
  it("should return with no user error", (done) => {
    const mw = getInventoriesMW({
        itemModel: {
            find: (param1,callback) =>{
                callback(null,"hunglishszoveg");
            }
        }
    });

    const res = {
        locals: {}
    };
    mw({},res,(err)=>{
        expect(err).to.eql("no user error");
        done();
    });
  });

   it("should return with serverSide error", (done) => {
    const mw = getInventoriesMW({
        itemModel: {
            find: (param1,callback) =>{
                expect(param1).to.be.eql({_owner: "testOwnerId"});
                callback("serverSideError",null);
            }
        }
    });

    const res = {
        locals: {
            user: {
                _id: "testOwnerId"
            }
        }
    };
    mw({},res,(err)=>{
        expect(err).to.eql("serverSideError");
        done();
    });
   });

   it("should return without error and with items on locals", (done) => {
    const mw = getInventoriesMW({
        itemModel: {
            find: (param1,callback) =>{
                expect(param1).to.be.eql({_owner: "testOwnerId"});
                callback(null,["testItem1", "testItem2"]);
            }
        }
    });

    const res = {
        locals: {
            user: {
                _id: "testOwnerId"
            }
        }
    };
    mw({},res,(err)=>{
        expect(err).to.be.eql(undefined);
        expect(res.locals.inventories).to.be.eql(["testItem1", "testItem2"]);
        done();
    });
   });
});
